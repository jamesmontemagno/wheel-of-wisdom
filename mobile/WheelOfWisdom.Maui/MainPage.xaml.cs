using System.Diagnostics;
using System.Text.Json;

namespace WheelOfWisdom.Maui;

public partial class MainPage : ContentPage
{
    private readonly GameHistoryDatabase historyDatabase = new();

    public MainPage()
    {
        InitializeComponent();
    }

    private async void OnHybridWebViewRawMessageReceived(object? sender, HybridWebViewRawMessageReceivedEventArgs e)
    {
        if (string.IsNullOrWhiteSpace(e.Message)) return;

        try
        {
            using var payload = JsonDocument.Parse(e.Message);
            if (payload.RootElement.ValueKind != JsonValueKind.Object) return;

            if (!payload.RootElement.TryGetProperty("type", out var typeElement))
            {
                return;
            }

            switch (typeElement.GetString())
            {
                case "save" when
                    payload.RootElement.TryGetProperty("values", out var valuesElement) &&
                    valuesElement.ValueKind == JsonValueKind.Object:
                    AppPreferences.SaveValues(valuesElement);
                    break;
                case "requestRestore":
                    var history = await historyDatabase.LoadAsync();
                    HybridWebViewControl.SendRawMessage(AppPreferences.RestorePayload(history));
                    break;
                case "saveHistory" when
                    payload.RootElement.TryGetProperty("requestId", out var requestIdElement) &&
                    requestIdElement.ValueKind == JsonValueKind.String &&
                    payload.RootElement.TryGetProperty("entry", out var entryElement):
                    var requestId = requestIdElement.GetString()!;
                    try
                    {
                        await historyDatabase.SaveAsync(entryElement);
                        SendHistoryResult("historySaved", requestId, true);
                    }
                    catch (Exception ex)
                    {
                        Debug.WriteLine($"Unable to save game history: {ex}");
                        SendHistoryResult("historySaved", requestId, false);
                    }
                    break;
                case "clearHistory" when
                    payload.RootElement.TryGetProperty("requestId", out var clearRequestIdElement) &&
                    clearRequestIdElement.ValueKind == JsonValueKind.String:
                    var clearRequestId = clearRequestIdElement.GetString()!;
                    try
                    {
                        await historyDatabase.ClearAsync();
                        SendHistoryResult("historyCleared", clearRequestId, true);
                    }
                    catch (Exception ex)
                    {
                        Debug.WriteLine($"Unable to clear game history: {ex}");
                        SendHistoryResult("historyCleared", clearRequestId, false);
                    }
                    break;
            }
        }
        catch (Exception ex)
        {
            Debug.WriteLine($"Unable to process a HybridWebView message: {ex}");
        }
    }

    private void SendHistoryResult(string type, string requestId, bool success)
    {
        HybridWebViewControl.SendRawMessage(JsonSerializer.Serialize(new
        {
            type,
            requestId,
            success,
        }));
    }
}

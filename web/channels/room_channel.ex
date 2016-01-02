defmodule Whiteboard.RoomChannel do
    use Phoenix.Channel

    def join("rooms:lobby", message, socket) do
        {:ok, socket}
    end

    def handle_in("draw", msg, socket) do
        broadcast! socket, "update", %{img: msg["img"]}
        {:noreply, socket}
    end
end

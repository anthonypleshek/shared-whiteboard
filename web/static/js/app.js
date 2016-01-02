import {Socket} from "deps/phoenix/web/static/js/phoenix"

class App {

    constructor(){
        this.channel = null
    }

    static init() {
        let socket = new Socket("/socket")
        socket.connect()
        socket.onClose( e => console.log("Closed connection") )

        this.channel = socket.channel("rooms:lobby", {})
        this.channel.join()
            .receive( "error", () => console.log("Connection error") )
            .receive( "ok",    () => console.log("Connected") )

        this.channel.on( "update", msg => this.updateDrawing(msg) )
    }

    static draw() {
        console.log("sending");
        this.channel.push("draw", {
            img: JSON.stringify(document.getElementById('drawing').getContext('2d').getImageData(0,0,200,200).data)
        })
    }

    static updateDrawing(msg) {
        console.log("updating");
        var drawing = document.getElementById("drawing").getContext('2d');

        var newImg = drawing.createImageData(200,200);
        var imgData = JSON.parse(msg.img);
        for(var i=0; i<newImg.data.length; i++) {
            newImg.data[i] = imgData[i];
        }

        drawing.putImageData(newImg,0,0);
    }

}

$( () => App.init() )

$(function() {
    $('#drawing').sketch();
    document.getElementById("serverButton").addEventListener("click", function(){setInterval(function(){App.draw()}, 5000)}, false);
});

export default App

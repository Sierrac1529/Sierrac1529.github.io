function openNav() {
    document.getElementById("myNav").style.width = "40%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
    window.requestAnimationFrame = requestAnimationFrame;
})();
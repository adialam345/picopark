function startGame() {
    document.getElementById("c").style.display = ""
    document.getElementById("menu").style.display = "none"
    document.getElementById("restartLevel").style.display = ""
    if (!mainGame.matter.running) {
        startMainGame()
        setInterval(() => {
            if (window.hostConnection) hostConnection.broadcast(JSON.stringify({
                startGame:true,
            }))
        }, 3000);
    }

}
function hideGame() {
    document.getElementById("menu").style.display = ""
    document.getElementById("c").style.display = "none"

}

function setRoomCode(c) {
    document.getElementById("roomCode").textContent = c
}

function addPlayerToMenu(name) {
    document.getElementById("memberlist").appendChild(createElementFromHTML(`<div>${name}<br></div>`))
}

function removePlayerFromMenu(name) {
    const memberList = document.getElementById("memberlist");
    const members = memberList.getElementsByTagName("div");
    for (let i = 0; i < members.length; i++) {
        if (members[i].textContent.includes(name)) {
            memberList.removeChild(members[i]);
            break;
        }
    }
}
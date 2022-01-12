let bank = 500;
let stage = "new"; 

function rand(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function tossUp() {
    return [rand(1,6), rand(1,6)];
}

function clickHandler() {
    let [cubeA, cubeB] = tossUp();
    let bet = document.getElementById("bet").value;
    if (isNaN(bet) || bet < 1 || bet > bank) {
        updateForm( console.error(), true);
    }
    else if (stage == "new") {
        gameresult = primaryGameHandler(cubeA, cubeB); 
        generalHandler(gameresult, cubeA, cubeB, bet); 
    }
    else if (stage == "point") {
        gameresult = pointGameHandler(cubeA, cubeB); 
        generalHandler(gameresult, cubeA, cubeB, bet); 
    }
    else {
        stage = "new";
        bank = moneyStatus;
        updateForm( startText(), true);
    }
}

function primaryGameHandler(cubeA, cubeB) {
    let sum = cubeA + cubeB;
    let result;
    if(sum === 7 || sum === 11) {
        result = "win";
    }
    else if(sum === 2 || sum === 8 || sum === 12) {
        result = "lose";
    }
    else {
        result = "point";
    }
    return result;
}

function generalHandler (gameresult, cubeA, cubeB, bet) {
    if (gameresult === "win") {
        stage = "win";
        moneyStatus = bank + bet * 2;
        newText( winText(cubeA, cubeB, bet), false);
    } 
    else if (gameresult === "lose") {
        stage = "lose";
        moneyStatus = bank - bet;
        newText( loseText(cubeA, cubeB, bet), false);
    }
    else if (gameresult === "point") {
        stage = "point";
        point = cubeA + cubeB;
        newText( pointStartMessage(cubeA, cubeB, bet), false);
    }
    else {
        newText( pointMessage(cubeA, cubeB, bet), false);
    }
}   


function winText (cubeA, cubeB, bet) {
    let walletText = `Баланс:${bank}`;
    let messageTxt = 
    `<p>На кубиках: ${cubeA}, ${cubeB}</p>
     <p>Вы выиграли, ваша награда ${bet*2}</p>`;
    let buttonTxt = `Играть`;
    return {
        wallet: walletText, 
        msg: messageTxt,
        button: buttonTxt
    };
}

function startText () {
    let walletText = `Баланс: ${bank}`;
    let messageText = null;
    let buttonText = `Бросить кубики`;
    return {
        wallet: walletText, 
        msg: messageText,
        button: buttonText
    };
}

function loseText (cubeA, cubeB, bet) {
    let walletText = `Баланс: ${bank}`;
    let messageText = 
    `<p>На кубиках:${cubeA}, ${cubeB}</p>
     <p>Ваша ставка не сыграла</p>`;
    let buttonText = `Сыграть еще`;
    return {
        wallet: walletText, 
        msg: messageText,
        button: buttonText
    };    
}

function pointGameHandler(cubeA, cubeB) {
    let sum = cubeA + cubeB;
    let result;
    if(sum === point) {
        result = "win";
    }
    else if(sum === 7) {
        result = "lose";
    }
    else {
        result = "continue";
    }
    return result;
}

function pointStartMessage (cubeA, cubeB, bet) {
    let walletText = `Ставка:${bet}$</span>`;
    let messageText = 
    `<p>На кубиках: ${cubeA}, ${cubeB}
    </p>Продолжай бросать</p>`;
    let buttonText = `Бросить еще раз`;
    return {
        wallet: walletText, 
        msg: messageText,
        button: buttonText
    };
}

function newText(msg) {
    let game = document.getElementById("bet");
    document.getElementById("wallet").innerHTML = msg.wallet;
    document.getElementById("msg").innerHTML = msg.msg;
    document.getElementById("toss-button").innerHTML = msg.button;
}
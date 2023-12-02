function loadingAnimation2232 (delay: number) {
    basic.showLeds(`
        . . # . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.pause(delay)
    basic.showLeds(`
        . # # # .
        . . # . .
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.pause(delay)
    basic.showLeds(`
        # # . # #
        . # # # .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.pause(delay)
    basic.showLeds(`
        # . . . #
        # # . # #
        . # # # .
        . . # . .
        . . . . .
        `)
    basic.pause(delay)
    basic.showLeds(`
        . . . . .
        # . . . #
        # # . # #
        . # # # .
        . . # . .
        `)
    basic.pause(delay)
    basic.showLeds(`
        . . . . .
        . . . . .
        # . . . #
        # # . # #
        . # # # .
        `)
    basic.pause(delay)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        # . . . #
        # # . # #
        `)
    basic.pause(delay)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        # . . . #
        `)
    basic.pause(delay)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        # . . . #
        `)
    basic.pause(delay)
}
function loadingAnimation () {
    basic.showLeds(`
        . . # . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        # # . # #
        . # # # .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        # . . . #
        # # . # #
        . # # # .
        . . # . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        # . . . #
        # # . # #
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
}
radio.onReceivedValue(function (name, value) {
    if (readyToReceive == true) {
        enemyChoice = value
    }
})
function displayChoice (choice: number) {
    if (choice == 1) {
        basic.showLeds(`
            . . . . .
            . # # # .
            . # . # .
            . # # # .
            . . . . .
            `)
    } else if (choice == 2) {
        basic.showLeds(`
            . # # # .
            . # # # .
            . # # # .
            . # # # .
            . # # # .
            `)
    } else if (choice == 3) {
        basic.showIcon(IconNames.Scissors)
    } else {
        basic.showIcon(IconNames.No)
    }
    basic.pause(1000)
}
let playerChoice = 0
let enemyChoice = 0
let readyToReceive = false
let radioChannel = 0
let radioChannelMenu = randint(1, 9)
basic.showIcon(IconNames.Triangle)
while (radioChannel == 0) {
    // set channel number
    if (input.buttonIsPressed(Button.AB)) {
        radioChannel = radioChannelMenu
        basic.showIcon(IconNames.Yes)
        basic.pause(500)
        radio.setGroup(radioChannel)
        basic.showNumber(radioChannel)
        basic.pause(500)
        basic.showIcon(IconNames.Yes)
        basic.pause(500)
        basic.showIcon(IconNames.Chessboard)
    }
    // Increase the channel number and print on the screen
    if (input.buttonIsPressed(Button.A)) {
        radioChannelMenu += -1
        if (radioChannelMenu < 1) {
            radioChannelMenu = 99
        }
        basic.showNumber(radioChannelMenu)
    }
    // Increase the channel number and print on the screen
    if (input.buttonIsPressed(Button.B)) {
        radioChannelMenu += 1
        if (radioChannelMenu > 99) {
            radioChannelMenu = 1
        }
        basic.showNumber(radioChannelMenu)
    }
    basic.pause(100)
}
basic.forever(function () {
    if (input.isGesture(Gesture.Shake)) {
        enemyChoice = 0
        playerChoice = randint(1, 3)
        readyToReceive = true
        displayChoice(playerChoice)
        radio.sendValue("choice", playerChoice)
        serial.writeValue("choice", playerChoice)
        loadingAnimation()
        readyToReceive = false
        if (enemyChoice == playerChoice) {
            basic.showIcon(IconNames.Asleep)
        } else if (playerChoice == 1 && enemyChoice == 3) {
            basic.showIcon(IconNames.Happy)
        } else if (playerChoice == 2 && enemyChoice == 1) {
            basic.showIcon(IconNames.Happy)
        } else if (playerChoice == 3 && enemyChoice == 2) {
            basic.showIcon(IconNames.Happy)
        } else if (enemyChoice == 0) {
            basic.showIcon(IconNames.No)
        } else {
            basic.showIcon(IconNames.Sad)
        }
        basic.pause(1000)
        basic.showIcon(IconNames.Chessboard)
    }
})

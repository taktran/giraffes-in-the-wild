function playNoMoreGiraffes () {
    kitronik_VIEW128x64.clear()
    kitronik_VIEW128x64.setFontSize(kitronik_VIEW128x64.FontSelection.Big)
    kitronik_VIEW128x64.show("No more", 1, kitronik_VIEW128x64.ShowAlign.Centre)
    kitronik_VIEW128x64.show("Giraffes in the wild!", 3, kitronik_VIEW128x64.ShowAlign.Centre)
    giraffeByeBye.showImage(0)
    music.startMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once)
}
function showNumGiraffes () {
    kitronik_VIEW128x64.clear()
    kitronik_VIEW128x64.setFontSize(kitronik_VIEW128x64.FontSelection.Big)
    kitronik_VIEW128x64.show("Giraffes in the wild", lineTitle, kitronik_VIEW128x64.ShowAlign.Centre)
    kitronik_VIEW128x64.show(numGiraffes, lineNumDisplay, kitronik_VIEW128x64.ShowAlign.Centre)
}
input.onButtonPressed(Button.A, function () {
    numGiraffes += 1
    music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 400, 600, 255, 0, 100, SoundExpressionEffect.Warble, InterpolationCurve.Linear), SoundExpressionPlayMode.InBackground)
    showNumGiraffes()
    // Can just draw 1 because it doesn't clear old ones
    drawGiraffes(1)
})
input.onButtonPressed(Button.B, function () {
    if (numGiraffes) {
        numGiraffes += -1
        music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 200, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), SoundExpressionPlayMode.InBackground)
        showNumGiraffes()
        if (numGiraffes == 0) {
            playNoMoreGiraffes()
        }
    }
    inkybit.clear()
    drawGiraffes(numGiraffes)
    inkybit.show()
})
function moveGiraffe () {
    giraffeTall.showImage(0)
    giraffeShort.showImage(0)
}
function showStartScreen () {
    kitronik_VIEW128x64.setFontSize(kitronik_VIEW128x64.FontSelection.Big)
    kitronik_VIEW128x64.show("Giraffes in the wild", lineTitle, kitronik_VIEW128x64.ShowAlign.Centre)
    kitronik_VIEW128x64.setFontSize(kitronik_VIEW128x64.FontSelection.Normal)
    kitronik_VIEW128x64.show("Press A to start", 7, kitronik_VIEW128x64.ShowAlign.Centre)
}
function drawGiraffes (num: number) {
    for (let index = 0; index < num; index++) {
        isTallGiraffe = Math.randomBoolean()
        if (isTallGiraffe) {
            inkybit.drawImage(
            giraffeTall,
            randint(0, inkybit.width()),
            randint(0, inkybit.height()),
            inkybit.Color.Black,
            inkybit.TextSize.Regular
            )
        } else {
            inkybit.drawImage(
            giraffeShort,
            randint(0, inkybit.width()),
            randint(0, inkybit.height()),
            inkybit.Color.Black,
            inkybit.TextSize.Regular
            )
        }
        inkybit.show()
    }
}
let isTallGiraffe = false
let giraffeByeBye: Image = null
let giraffeShort: Image = null
let giraffeTall: Image = null
let numGiraffes = 0
let lineNumDisplay = 0
let lineTitle = 0
lineTitle = 1
lineNumDisplay = 4
numGiraffes = 0
giraffeTall = images.createImage(`
    # # . . .
    . # . . .
    . # . . .
    . # # # #
    . # . # .
    `)
giraffeShort = images.createImage(`
    . . . . .
    # # . . .
    . # . . #
    . # # # .
    . # . # .
    `)
giraffeByeBye = images.createImage(`
    . # . # .
    # # # # .
    . . . # .
    . # # # .
    . # . . .
    `)
music.setVolume(128)
giraffeTall.showImage(0)
led.setBrightness(128)
inkybit.clear()
inkybit.show()
kitronik_VIEW128x64.clear()
showStartScreen()
loops.everyInterval(100, function () {
    if (numGiraffes > 0) {
        moveGiraffe()
    }
})

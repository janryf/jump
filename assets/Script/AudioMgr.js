var bkMusicIndex = 0

export function playBkMusic(music, bLoop)
{
    cc.audioEngine.stop(bkMusicIndex)
    cc.audioEngine.stopAll()
    bkMusicIndex = cc.audioEngine.play(music, bLoop)
}

export function playSound(sound)
{
    cc.audioEngine.play(sound, false)
}

export function stopBkMusic()
{
    cc.audioEngine.stopAll()
    cc.audioEngine.stop(bkMusicIndex)
}
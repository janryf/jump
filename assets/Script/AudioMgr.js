var bkMusicIndex = 0

export function playBkMusic(music, bLoop)
{
    cc.audioEngine.stop(bkMusicIndex)
    bkMusicIndex = cc.audioEngine.play(music, bLoop)
}

export function playSound(sound)
{
    cc.audioEngine.play(sound, false)
}
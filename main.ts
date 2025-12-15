function activate () {
    if (state2 == "stop") {
        Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
    } else if (state2 == "vooruit") {
        Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CW, v_l)
        Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CW, v_r)
        basic.showArrow(ArrowNames.North)
    } else if (state2 == "achteruit") {
        Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CCW, v_l)
        Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CCW, v_r)
        basic.showArrow(ArrowNames.South)
    }
    Maqueen_V5.servoRun(Maqueen_V5.Servos.S1, servo)
}
IR.IR_callbackUser(function () {
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
    basic.clearScreen()
    ircode = IR.IR_read()
    if (ircode == remoteControl.een()) {
        servo = 90
    } else if (ircode == remoteControl.twee()) {
        servo = 0
    } else if (ircode == remoteControl.op()) {
        invoer = "vooruit"
        v_l = snelheid
        v_r = snelheid
    } else if (ircode == remoteControl.neer()) {
        invoer = "achteruit"
        v_l = snelheid
        v_r = snelheid
    } else if (ircode == remoteControl.links()) {
        richting = "links"
        v_r += 25
        v_l += -25
    } else if (ircode == remoteControl.rechts()) {
        richting = "rechts"
        v_r += -25
        v_l += 25
    } else if (ircode == remoteControl.vier()) {
        basic.showNumber(servo / 10)
        servo += -10
    } else if (ircode == remoteControl.vijf()) {
        servo += 10
    } else if (ircode == remoteControl.zeven()) {
        snelheid += -10
    } else if (ircode == remoteControl.acht()) {
        snelheid += 10
    } else if (ircode == remoteControl.ok()) {
        state2 = "stop"
        v_l = snelheid
        v_r = snelheid
    } else {
    	
    }
    if (invoer != "") {
        Flip(invoer)
        if (v_l == v_r) {
            richting = "rechtdoor"
        }
    }
    invoer = ""
    activate()
    serial.writeNumber(Maqueen_V5.getBatteryData(Maqueen_V5.BatteryType.Lithium))
    serial.writeValue("v_l", v_l)
    serial.writeValue("v_r", v_r)
})
function Flip (myState: string) {
    if (state2 == myState && richting == "rechtdoor") {
        state2 = "stop"
    } else {
        state2 = myState
    }
}
let richting = ""
let ircode = 0
let invoer = ""
let servo = 0
let v_r = 0
let v_l = 0
let snelheid = 0
let state2 = ""
Maqueen_V5.I2CInit()
IR.IR_init()
remoteControl.init_rc_hx1838()
state2 = "stop"
snelheid = 100
v_l = snelheid
v_r = snelheid
servo = 90
invoer = ""
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate115200)

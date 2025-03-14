package net.elpuig;

public class Ordenador {

    private Usb usb;

    public Usb getUsb() {
        return usb;
    }

    public void setUsb(Usb usb) {
        this.usb = usb;
    }

    public Ordenador(Usb usb) {
        this.usb = usb;
        System.out.println("Se ha creado un objeto de la clase "+ this.getClass());
    }
}

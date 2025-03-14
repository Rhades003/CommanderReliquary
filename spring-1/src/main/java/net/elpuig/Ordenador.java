package net.elpuig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
public class Ordenador {

    @Autowired
    @Qualifier("pendrive")
    private Usb usb;

    public Usb getUsb() {
        return usb;
    }

    public void setUsb(Usb usb) {
        this.usb = usb;
    }

    public Ordenador() {
        //this.usb = usb;
        System.out.println("Se ha creado un objeto de la clase "+ this.getClass());
    }
}

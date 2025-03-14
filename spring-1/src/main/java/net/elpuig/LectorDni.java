package net.elpuig;

import org.springframework.stereotype.Component;

@Component("lector")
public class LectorDni implements Usb {
    public String info(){
        return "lectorDni";
    }
}

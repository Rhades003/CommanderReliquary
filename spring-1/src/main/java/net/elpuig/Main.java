package net.elpuig;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Main {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
        Ordenador miOrdenador = (Ordenador) context.getBean("ordenador");
        System.out.println(miOrdenador.getUsb().info());
    }
}

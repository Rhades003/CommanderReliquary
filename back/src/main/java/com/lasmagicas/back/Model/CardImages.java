package com.lasmagicas.back;

public class CardImages {

    private String small;
    private String normal;
    private String large;
    private String png;

    public CardImages(String small, String normal, String large, String png) {
        this.small = small;
        this.normal = normal;
        this.large = large;
        this.png = png;
    }

    public String getSmall() {
        return small;
    }

    public void setSmall(String small) {
        this.small = small;
    }

    public String getNormal() {
        return normal;
    }

    public void setNormal(String normal) {
        this.normal = normal;
    }

    public String getLarge() {
        return large;
    }

    public void setLarge(String large) {
        this.large = large;
    }

    public String getPng() {
        return png;
    }

    public void setPng(String png) {
        this.png = png;
    }
}

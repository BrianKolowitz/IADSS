/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package edu.cmu.iadss.common;

/**
 *
 * @author vagrant
 */
public class DicomSendTask extends QueuedTask {
    private String configFileName;
    private String dicomFileName;
    private String destinationAe;
    private String destinationIp;
    private int destinationPort;

    /**
     * @return the configFileName
     */
    public String getConfigFileName() {
        return configFileName;
    }

    /**
     * @param configFileName the configFileName to set
     */
    public void setConfigFileName(String configFileName) {
        this.configFileName = configFileName;
    }

    /**
     * @return the dicomFileName
     */
    public String getDicomFileName() {
        return dicomFileName;
    }

    /**
     * @param dicomFileName the dicomFileName to set
     */
    public void setDicomFileName(String dicomFileName) {
        this.dicomFileName = dicomFileName;
    }

    /**
     * @return the destinationAe
     */
    public String getDestinationAe() {
        return destinationAe;
    }

    /**
     * @param destinationAe the destinationAe to set
     */
    public void setDestinationAe(String destinationAe) {
        this.destinationAe = destinationAe;
    }

    /**
     * @return the destinationIp
     */
    public String getDestinationIp() {
        return destinationIp;
    }

    /**
     * @param destinationIp the destinationIp to set
     */
    public void setDestinationIp(String destinationIp) {
        this.destinationIp = destinationIp;
    }

    /**
     * @return the destinationPort
     */
    public int getDestinationPort() {
        return destinationPort;
    }

    /**
     * @param destinationPort the destinationPort to set
     */
    public void setDestinationPort(int destinationPort) {
        this.destinationPort = destinationPort;
    }
    
}

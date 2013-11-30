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
public class DicomWrapTask extends QueuedTask {
    private String configFileName;
    private String inputFileName;
    private String dicomFileName;

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
     * @return the inputFileName
     */
    public String getInputFileName() {
        return inputFileName;
    }

    /**
     * @param inputFileName the inputFileName to set
     */
    public void setInputFileName(String inputFileName) {
        this.inputFileName = inputFileName;
    }
    
}

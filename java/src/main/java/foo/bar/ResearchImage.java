package foo.bar;

/**
 * Created with IntelliJ IDEA.
 * User: parallels
 * Date: 11/24/13
 * Time: 6:01 PM
 * To change this template use File | Settings | File Templates.
 */
public class ResearchImage {
    private String patientName;
    private String patientId;
    private String AccessionNumber;

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public String getAccessionNumber() {
        return AccessionNumber;
    }

    public void setAccessionNumber(String accessionNumber) {
        AccessionNumber = accessionNumber;
    }
}

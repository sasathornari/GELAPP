export interface TimeAttendance {
    tmaId?: number;
    empId: string;
    proId: string;
    time_in: string;
    time_out: string;    
    userCreated?: string;
    dateCreated?: string;
    ipCreated?: string;
    userUpdated?: string;
    dateUpdated?: string;
    ipUpdated?: string;

}
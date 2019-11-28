export interface TimeAttendance {
    tmaId?: number;
    ProjId?: string;
    empId: string;
    empTitle?: string;
    empName?: string;
    empSurname?: string;    
    time_in: string;
    time_out: string;    
    userCreated?: string;
    dateCreated?: string;
    ipCreated?: string;
    userUpdated?: string;
    dateUpdated?: string;
    ipUpdated?: string;

}
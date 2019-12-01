export interface TimeAttendance {
    tmaId?: number;
    ProjId?: string;
    empId: string;
    dateIn?: string;
    time_in?: string;
    dateOut?: string;
    time_out?: string;   
    description?: string;
    images?: string;  
    userCreated?: string;
    dateCreated?: string;
    ipCreated?: string;
    userUpdated?: string;
    dateUpdated?: string;
    ipUpdated?: string;

}
export interface TimeAttendance {
    tmaId?: number;    
    empId: string;
    ProjId_in?: string;
    dateIn?: string;
    time_in?: string;
    latitude_in?: string;
    longtitude_in?: string;
    ProjId_out?: string;
    dateOut?: string;
    time_out?: string;   
    latitude_out: string;
    longtitude_out: string;
    description?: string;
    images?: string;  
    userCreated?: string;
    dateCreated?: string;
    ipCreated?: string;
    userUpdated?: string;
    dateUpdated?: string;
    ipUpdated?: string;

}
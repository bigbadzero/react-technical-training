interface IUserData {
    firstName?:string,
    lastName?: string
    email?: string;
    birthday?: Date;
    question1?: number;
    question2?: number;
    question3?: number;
    completionDate?: Date;
    token?:string;
    timeout?: number;
}

export default IUserData;
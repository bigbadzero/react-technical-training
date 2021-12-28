import IUserData from "../../models/IUserData";
import { Fragment } from "react";

const TableData: React.FC<{ user: IUserData}> = (props) => {
    const birthDay =  new Date(props.user.birthday as Date).toLocaleDateString('en-US');
    const completionDate = new Date(props.user.completionDate as Date).toLocaleDateString('en-US');
    const offset: number = (props.user.question1 as number) + (props.user.question2 as number) + (props.user.question3 as number);
    const bodyAge =  new Date(props.user.completionDate as Date).getFullYear() - new Date(props.user.birthday as Date).getFullYear() + offset;
  return (
    <Fragment>
      <tr>
        <td>{props.user.firstName}</td>
        <td>{props.user.lastName}</td>
        <td>{birthDay}</td>
        <td>{completionDate}</td>
        <td>{bodyAge}</td>
      </tr>
    </Fragment>
  );
};
export default TableData;

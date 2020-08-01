import styled from 'styled-components';
import {Button as MButton} from "@material-ui/core";
import Button from "@material-ui/core/Button";

export const ItemButton = styled(Button)`
  color="inherit";
`;
export const DashHolder = styled.ul`
text-align:left;
`;
export const DashItemTitle = styled.li`
text-align: center;
margin: 5px 0;
padding: 5px 10px;
font-size: 16px;
font-weight: bold;
list-style: none;
`;
export const DashItem = styled.li`
text-align:center;
list-style: none;
`;
export const Wrapper = styled.section`
padding: 8em;
background: #e6ffff;
height:50vh;
`;


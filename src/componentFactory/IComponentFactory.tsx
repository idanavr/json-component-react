import { IField } from '../IFormGenerator';

export interface IParams {
    config: IField,
    onInputChange(e: any, field: IField): any,
    onBtnClick(e: any, props: any): any,
}
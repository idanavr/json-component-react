import { IField, IController } from '../IFormGenerator';

export interface IParams {
    config: IField | IController,
    onInputChange?(e: any, field: IField): any,
    onBtnClick?(e: any, props: any): any,
}
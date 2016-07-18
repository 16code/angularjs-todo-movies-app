// 依赖组件
import billboardCard from '../../components/billboard-card';
import BillboardController from './billboard.controller';
const module = angular.module('app.pages.billboard', [billboardCard.name])
    .controller(BillboardController.name, BillboardController);

export default module.name;

import { NgModule } from "@angular/core";
import { NZ_ICONS } from "ng-zorro-antd";
import * as ICONS from "@ant-design/icons-angular/icons";

const icons = [
  ICONS.MenuFoldOutline,
  ICONS.MenuUnfoldOutline,
  ICONS.DashboardOutline,
  ICONS.FormOutline,
  ICONS.ControlOutline,
  ICONS.LogoutOutline,
  ICONS.ArrowLeftOutline,
  ICONS.MailOutline,
  ICONS.LockOutline,
  ICONS.UserOutline,
  ICONS.AppstoreOutline,
  ICONS.ClusterOutline,
  ICONS.TeamOutline,
  ICONS.FolderOutline,
  ICONS.CloudServerOutline,
  ICONS.QuestionOutline,
  ICONS.LeftOutline,
  ICONS.CheckOutline,
  ICONS.CloseOutline,
  ICONS.DownOutline,
  ICONS.UpOutline,
  ICONS.BlockOutline,
  ICONS.PlusOutline,
  ICONS.FlagOutline,
  ICONS.ApartmentOutline,
  ICONS.ScanOutline,
  ICONS.LockOutline,
  ICONS.UnlockOutline,
  ICONS.CodeTwoTone,
  ICONS.EditTwoTone,
  ICONS.ContainerOutline
];

@NgModule({
  providers: [{ provide: NZ_ICONS, useValue: icons }]
})
export class IconsProviderModule {}

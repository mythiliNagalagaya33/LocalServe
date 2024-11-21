import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Home/home/home.component';
import { LoginComponent } from './Home/login/login.component';
import { SignupComponent } from './Home/signup/signup.component';
import { ProviderSignupComponent } from './Home/providersignup/providersignup.component';
import { AdminComponent } from './Admin/admin-sidebar/admin.component';
import { ListingsComponent } from './Home/listings/listings.component';
// import { CleaningComponent } from './cleaning/cleaning.component';
// import { PlumberComponent } from './plumber/plumber.component';
// import { AirConditionerComponent } from './air-conditioner/air-conditioner.component';
// import { WashingMachineComponent } from './washing-machine/washing-machine.component';
// import { ElectricianComponent } from './electrician/electrician.component';
// import { TvRepairComponent } from './tv-repair/tv-repair.component';
// // import { PainterComponent } from './painter/painter.component';
// import { CarpenterComponent } from './carpenter/carpenter.component';
// import { BeautySalonComponent } from './beauty-salon/beauty-salon.component';
// import { ComputerRepairComponent } from './computer-repair/computer-repair.component';
// import { GardeningComponent } from './gardening/gardening.component';
// import { RefrigeratorComponent } from './refrigerator/refrigerator.component';
// import { MoversAndPackersComponent } from './movers-and-packers/movers-and-packers.component';
// import { RoomCoolerComponent } from './room-cooler/room-cooler.component';
// import { WaterPurifierComponent } from './water-purifier/water-purifier.component';
// import { CctvCameraComponent } from './cctv-camera/cctv-camera.component';
import { TestlistingComponent } from './testlisting/testlisting.component';
import { UserManagementComponent } from './Admin/user-management/user-management.component';
// import { ContentManagementComponent } from './content-management/content-management.component';
import { TestadminComponent } from './testadmin/testadmin.component';
// import { ProviderManagementComponent } from './provider-management/provider-management.component';
import  { AboutusComponent } from './Home/aboutus/aboutus.component';
import { UserdashboardComponent } from './user/userdashboard/userdashboard.component';
import { BlogsComponent } from './Home/blogs/blogs.component';
import { ServiceManagementComponent } from './Admin/service-management/service-management.component';
import { DynamicServiceComponent } from './dynamic-service/dynamic-service.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UserNavbarComponent } from './user/user-navbar/user-navbar.component';
import { UserSidebarComponent } from './user/user-sidebar/user-sidebar.component';
import { UserAboutusComponent } from './user/user-aboutus/user-aboutus.component';
import { UserBlogsComponent } from './user/user-blogs/user-blogs.component';
import { UserComponent } from './user/user/user.component';
import { ProviderProfileComponent } from 'src/app/provider/provider-profile/provider-profile.component';
import { ProviderComponent } from 'src/app/provider/provider/provider.component';
// import { BookingComponent } from './booking/booking.component';
import { ProviderManagementComponent } from './Admin/provider-management/provider-management.component';
import { ContentComponent } from './Home/content/content.component';
import { ServicesComponent } from './user/services/services.component';
import { UserBookingComponent } from './user/user-booking/user-booking.component';
import { AddAvailabilityComponent } from './provider/add-availability/add-availability.component';
import { ProviderBookingComponent } from './provider/provider-booking/provider-booking.component';
import { BookingsUserComponent } from './user/bookings-user/bookings-user.component';
import { ProviderNotificationComponent } from './provider/provider-notification/provider-notification.component';
import { UserNotificationsComponent } from './user/user-notifications/user-notifications.component';
import { PendingProvidersComponent } from './Admin/pending-providers/pending-providers.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { PendingComponent } from './provider/pending/pending.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { AdminDashboardOverviewComponent } from './Admin/admin-dashboard-overview/admin-dashboard-overview.component';
import { UserInactiveComponent } from './user/user-inactive/user-inactive.component';
import { AdminNotificationsComponent } from './Admin/admin-notifications/admin-notifications.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { adminAuthGuard } from 'src/Authguards/admin-auth.guard';
import { userAuthGuard } from 'src/Authguards/user-auth.guard';
import { providerAuthGuard } from 'src/Authguards/provider-auth.guard';
// import { AdminDashboardOverviewComponent } from './Admin/admin-dashboard-overview/admin-dashboard-overview.component';
// import { AuthService } from './auth.service';


const routes: Routes = [
    { path: '', component: HomeComponent,
      children: [
        { path: '', component: ContentComponent },
        { path: 'login', component: LoginComponent },
        {
          path: 'signup',
          children: [
            { path: 'user', component: SignupComponent },
            { path: 'provider', component: ProviderSignupComponent }
          ]
        },
        { path: 'listings', component: ListingsComponent },
        { path: 'aboutus', component: AboutusComponent },
        { path: 'blogs', component: BlogsComponent },

      ]
     },
     { path: 'pending', component: PendingComponent },
     { path: 'user-inactive', component: UserInactiveComponent },

    
    {
      path: 'admin',
      component: AdminDashboardComponent,
      canActivate: [adminAuthGuard],
      children: [
        { path: '', redirectTo: 'dashboard-overview', pathMatch: 'full' }, // Add this line to redirect to the dashboard: AdminDashboardOverviewComponent },
        { path: 'user-management', component: UserManagementComponent },
        { path: 'provider-management', component: ProviderManagementComponent },
        { path: 'service-management', component: ServiceManagementComponent },
        { path: 'pending-requests', component: PendingProvidersComponent },
        { path: 'dashboard-overview', component: AdminDashboardOverviewComponent },
        { path: 'notifications', component: AdminNotificationsComponent }
      ]
    },
    {
      path: 'user',
      component: UserComponent,
      canActivate: [userAuthGuard],                                                                                                                                         
      children: [
        { path: '', component: UserdashboardComponent },
        { path: 'aboutus', component: UserAboutusComponent },
        { path: 'blogs', component: UserBlogsComponent },
        { path: 'listings/:service_id', component: DynamicServiceComponent },
        { path: 'listings', component: ServicesComponent },
        // { path: 'bookings', component: UserBookingComponent }
        { path:  'bookings/:service_id/:provider_id', component: UserBookingComponent },
        { path: 'mybookings', component: BookingsUserComponent },
        { path: 'notifications', component: UserNotificationsComponent },
        { path: 'user-profile', component: UserProfileComponent },
        { path: 'feedback/:booking_id', component: FeedbackComponent }  // Updated route with booking_id
        
      ]
    },
    {
      path: 'provider',
      component: ProviderComponent,
      canActivate: [providerAuthGuard],
      children: [
        { path: '', redirectTo: 'bookings', pathMatch: 'full' }, // Add this line to redirect to the dashboard: AdminDashboardOverviewComponent },
        { path: '', component:ProviderBookingComponent},
        { path: 'profile', component: ProviderProfileComponent },
        { path: 'blogs', component: BlogsComponent },
        { path: 'availability', component: AddAvailabilityComponent },
        { path: 'bookings', component: ProviderBookingComponent },
        { path: 'notification', component: ProviderNotificationComponent },
        // Add the route for PendingComponent
      ]
    },
    // { path: 'listings', component: ListingsComponent },
    // { path: 'listings/:service_id', component: DynamicServiceComponent },
    // { path: 'aboutus', component: AboutusComponent },
    // { path: 'blogs', component: BlogsComponent },
  ];
  
  
  
   

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}































 // {
  // path: 'listings', 
  // component: TestlistingComponent,
  // children: [
  //   {  path: '', 
  //     component: ListingsComponent},
  //   { path: 'cleaning', component: CleaningComponent },
  //   { path: 'plumber', component: PlumberComponent },
  //   { path: 'air-conditioner', component: AirConditionerComponent },
  //   { path: 'washing-machine', component: WashingMachineComponent },
  //   { path: 'electrician', component: ElectricianComponent },
  //   { path: 'tv-repair', component: TvRepairComponent },
  //   { path: 'painter', component: PainterComponent },
  //   { path: 'carpenter', component: CarpenterComponent },
  //   { path: 'beauty-salon', component: BeautySalonComponent },
  //   { path: 'computer-repair', component: ComputerRepairComponent },
  //   { path: 'gardening', component: GardeningComponent },
  //   { path: 'refrigerator', component: RefrigeratorComponent },
  //   { path: 'movers-and-packers', component: MoversAndPackersComponent },
  //   { path: 'room-cooler', component: RoomCoolerComponent },
  //   { path: 'water-purifier', component: WaterPurifierComponent },
  //   { path: 'cctv-camera', component: CctvCameraComponent },
  // ]

   // { path: 'content-management', component: ContentManagementComponent },
    // { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
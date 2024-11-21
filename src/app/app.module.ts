import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// import { HeaderComponent } from './header/header.component';
// import { ChildComponent } from './child/child.component';
import { NavbarComponent } from './Home/navbar/navbar.component';
import { HomeComponent } from './Home/home/home.component';
import { LoginComponent } from './Home/login/login.component';
import { FooterComponent } from './Home/footer/footer.component';
import { CardsComponent } from './cards/cards.component';
import { SignupComponent } from './Home/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ProviderSignupComponent } from './Home/providersignup/providersignup.component';
import { AdminComponent } from './Admin/admin-sidebar/admin.component';
import { ListingsComponent } from './Home/listings/listings.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OverlayModule, Overlay } from '@angular/cdk/overlay';
import { MAT_DATEPICKER_SCROLL_STRATEGY } from '@angular/material/datepicker';
// import { MatDatepickerModule } from '@angular/material/datepicker';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
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
// import { ElevatorComponent } from './elevator/elevator.component';
// import { MoversAndPackersComponent } from './movers-and-packers/movers-and-packers.component';
// import { RoomCoolerComponent } from './room-cooler/room-cooler.component';
// import { WaterPurifierComponent } from './water-purifier/water-purifier.component';
// import { CctvCameraComponent } from './cctv-camera/cctv-camera.component';
import { TestlistingComponent } from './testlisting/testlisting.component';
import { UserManagementComponent } from './Admin/user-management/user-management.component';
// import { ContentManagementComponent } from './content-management/content-management.component';
import { TestadminComponent } from './testadmin/testadmin.component';
// import { ProviderManagementComponent } from './provider-management/provider-management.component';
import { AboutusComponent } from './Home/aboutus/aboutus.component';
import { UserdashboardComponent } from './user/userdashboard/userdashboard.component';
import { BlogsComponent } from './Home/blogs/blogs.component';
import { ServiceManagementComponent } from './Admin/service-management/service-management.component';
import { DynamicServiceComponent } from './dynamic-service/dynamic-service.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { UserNavbarComponent } from './user/user-navbar/user-navbar.component';
import { UserSidebarComponent } from './user/user-sidebar/user-sidebar.component';
// import { UserModelComponent } from './user/user-model/user-model.component';
import { UserAboutusComponent } from './user/user-aboutus/user-aboutus.component';
import { UserBlogsComponent } from './user/user-blogs/user-blogs.component';
import { UserComponent } from './user/user/user.component';
import { UserModalComponent } from './user/user-modal/user-modal.component';
import { ProviderProfileComponent } from './provider/provider-profile/provider-profile.component';
import { ProviderNavbarComponent } from './provider/provider-navbar/provider-navbar.component';
import { ProviderSidebarComponent } from './provider/provider-sidebar/provider-sidebar.component';
import { ProviderComponent } from './provider/provider/provider.component';
// import { BookingComponent } from './booking/booking.component';
import { ProviderManagementComponent } from './Admin/provider-management/provider-management.component';
import { ContentComponent } from './Home/content/content.component';
import { ServicesComponent } from './user/services/services.component';
import { UserBookingComponent } from './user/user-booking/user-booking.component';
import { BookNowComponent } from './user/book-now/book-now.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Add this import
import { AddAvailabilityComponent } from './provider/add-availability/add-availability.component';
import { ProviderBookingComponent } from './provider/provider-booking/provider-booking.component';
import { ProviderNotificationComponent } from './provider/provider-notification/provider-notification.component';
import { UserNotificationsComponent } from './user/user-notifications/user-notifications.component';
import { PendingProvidersComponent } from './Admin/pending-providers/pending-providers.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { PendingComponent } from './provider/pending/pending.component';
import { AdminNavbarComponent } from './Admin/admin-navbar/admin-navbar.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AdminDashboardOverviewComponent } from './Admin/admin-dashboard-overview/admin-dashboard-overview.component';
import { AppRoutingModule } from './app-routing.module';  // Correctly import the routing module
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { RoleSelectionModalComponent } from './role-selection-modal/role-selection-modal.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
@NgModule({ declarations: [
        AppComponent,
        // HeaderComponent,
        // ChildComponent,
        NavbarComponent,
        HomeComponent,
        LoginComponent,
        FooterComponent,
        CardsComponent,
        SignupComponent,
        ProviderSignupComponent,
        AdminComponent,
        ListingsComponent,
        // CleaningComponent,
        // PlumberComponent,
        // AirConditionerComponent,
        // WashingMachineComponent,
        // ElectricianComponent,
        // TvRepairComponent,
        // // PainterComponent,
        // CarpenterComponent,
        // BeautySalonComponent,
        // ComputerRepairComponent,
        // GardeningComponent,
        // RefrigeratorComponent,
        // ElevatorComponent,
        // MoversAndPackersComponent,
        // RoomCoolerComponent,
        // WaterPurifierComponent,
        // CctvCameraComponent,
        TestlistingComponent,
        UserManagementComponent,
        // ContentManagementComponent,
        TestadminComponent,
        ProviderManagementComponent,
        AboutusComponent,
        UserdashboardComponent,
        BlogsComponent,
        // ProviderdashboardComponent,
        ServiceManagementComponent,
        DynamicServiceComponent,
        UserNavbarComponent,
        UserSidebarComponent,
        // ProfileModalComponent,
        UserAboutusComponent,
        UserBlogsComponent,
        UserComponent,
        UserModalComponent,
        ProviderProfileComponent,
        ProviderNavbarComponent,
        ProviderSidebarComponent,
        ProviderComponent,
        ContentComponent,
        ServicesComponent,
        UserBookingComponent,
        BookNowComponent,
        AddAvailabilityComponent,
        ProviderBookingComponent,
        ProviderNotificationComponent,
        UserNotificationsComponent,
        PendingProvidersComponent,
        UserProfileComponent,
        PendingComponent,
        AdminNavbarComponent,
        AdminDashboardComponent,
        FeedbackComponent,
        AdminDashboardOverviewComponent,
        RoleSelectionModalComponent
        
        // BookingComponent
    ],
    bootstrap: [AppComponent], 
    imports: [BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatRadioModule,
    HttpClientModule
  ], 

        providers: [
            {
                provide: MAT_DATEPICKER_SCROLL_STRATEGY,
                useFactory: (overlay: Overlay) => () => overlay.scrollStrategies.reposition(),
                deps: [Overlay]
              },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, }, MatDatepickerModule, MatNativeDateModule,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }

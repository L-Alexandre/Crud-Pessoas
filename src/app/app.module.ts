import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { ProfileCreateUpdateComponent } from './pages/profile/profile-create-update/profile-create-update.component';
import { ProfileListComponent } from './pages/profile/profile-list/profile-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileService } from './services/profile.service';


    @NgModule({
      declarations: [
              AppComponent,
              ProfileListComponent,
              HeaderComponent,
              HomeComponent,
              ProfileCreateUpdateComponent
  ],
  imports: [              
              AppRoutingModule,
              FormsModule,
              HttpClientModule,
              BrowserModule,
              ReactiveFormsModule
  ],
  providers: [ProfileService],
  bootstrap: [AppComponent]
})


export class AppModule { }
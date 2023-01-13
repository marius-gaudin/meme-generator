import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextComponent } from './components/editor/components/text/text.component';
import { EditorComponent } from './components/editor/editor.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptorProvider } from './auth/token.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { SelectMemeComponent } from './components/select-meme/select-meme.component';

@NgModule({
  declarations: [
    AppComponent,
    TextComponent,
    EditorComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    SelectMemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [TokenInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }

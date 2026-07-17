import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';

// Components
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';
import { SidebarComponent } from './components/sidebar/sidebar';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner';

// Pipes
import { StatusColorPipe } from './pipes/status-color-pipe';
import { PriorityIconPipe } from './pipes/priority-icon-pipe';
import { TruncatePipe } from './pipes/truncate-pipe';

// Directives
// import { HasRoleDirective } from './directives/has-role.directive';

const materialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
  MatChipsModule,
  MatTooltipModule,
  MatBadgeModule
];

@NgModule({
  declarations: [
    Header,
    FooterComponent,
    SidebarComponent,
    LoadingSpinnerComponent,
    StatusColorPipe,
    PriorityIconPipe,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules
  ],
  exports: [
    // Components
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoadingSpinnerComponent,
    // Pipes
    StatusColorPipe,
    PriorityIconPipe,
    TruncatePipe,
    // Modules
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules
  ]
})
export class SharedModule { }
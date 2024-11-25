import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonChip, IonIcon, IonBadge, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { enterOutline, libraryOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [RouterLink, IonButton, IonIcon, IonChip, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MenuPage implements OnInit {

  constructor() { 
    addIcons({libraryOutline,enterOutline});
  }

  ngOnInit() {
  }

}

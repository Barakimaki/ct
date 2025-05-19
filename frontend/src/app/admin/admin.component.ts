import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatAnchor} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatNavList} from "@angular/material/list";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    MatAnchor,
    RouterLink,
    NgIf,
    MatSidenavContent,
    MatNavList,
    MatSidenav,
    MatSidenavContainer
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}

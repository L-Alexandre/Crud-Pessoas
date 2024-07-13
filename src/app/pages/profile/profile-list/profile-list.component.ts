import { Component, Input } from '@angular/core';
import { Profile } from 'src/app/interfaces/profile';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

    @Component({
      selector: 'app-profile-list',
      templateUrl: './profile-list.component.html',
      styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent {
  
  constructor(private profileService: ProfileService) { }

    @Input() profiles: Profile[] = [];
  
    ngOnInit() {
      this.loadProfiles();
    }

    loadProfiles() {
      this.profileService.buscarTodos().subscribe(result => {
        this.profiles = result;
      });
    }

  confirmDelete(id: string) {
    Swal.fire({
      title: "Tem certeza que deseja excluir essa pessoa?",
      text: "Você não poderá reverter essa operação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, delete!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.apagarProfile(id);
      }
    });
  }

  apagarProfile(id: string) {
    this.profileService.apagarProfile(id).subscribe(() => {
      this.loadProfiles();
      Swal.fire({
        title: "Removido!",
        text: "A pessoa foi removida com sucesso.",
        icon: "success"
      });
    });
  }
}
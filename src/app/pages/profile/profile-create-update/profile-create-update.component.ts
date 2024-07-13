import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/interfaces/profile';


@Component({
  selector: 'app-profile-create-update',
  templateUrl: './profile-create-update.component.html',
  styleUrls: ['./profile-create-update.component.css']
})
export class ProfileCreateUpdateComponent {

  constructor(private profileService: ProfileService, private router: Router,private route:ActivatedRoute, private formBuilder: FormBuilder) {
    this.profileId = route.snapshot.params['id'];
  }
  
  profileId:string;

  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    age: new FormControl(0, [Validators.required, Validators.min(0)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    isActive: new FormControl(false),
    country: new FormControl(''),
    experience: new FormControl(''),
  })

  ngOnInit(){
    if(typeof this.profileId !='undefined'){
      let profile:Profile
      this.profileService.buscarPoId(this.profileId).subscribe((result)=>
        {
          profile=result;
          this.profileForm =this.formBuilder.group({
            name: new FormControl(profile.name, Validators.required),
            role: new FormControl(profile.role, Validators.required),
            age: new FormControl(profile.age, [Validators.required, Validators.min(0)]),
            email: new FormControl(profile.email, [Validators.required, Validators.email]),
            isActive: new FormControl(profile.isActive),
            country: new FormControl(profile.country),
            experience: new FormControl(profile.experience),
          });
        });
    }
  }


  onSubmit() {
    const profile: Profile = this.profileForm.value as Profile;
    if(typeof this.profileId =='undefined'){
      this.profileService.cadastrar(profile)
      .subscribe(result => {
        console.log(result)
        Swal.fire({
          title: 'Pessoa cadastrada com sucesso!',
          text: 'Dados da pessoa salvos em nossa base de dados',
          icon: 'success',
        })
        this.router.navigateByUrl('/profile')
      });
    }else{
      profile.id = this.profileId;
      console.log(profile);
      
      this.profileService.atualizar(profile)
      .subscribe(result => {
        console.log(result)
        
        Swal.fire({
          title: 'Pessoa cadastrada com sucesso!',
          text: 'Dados da pessoa atualizados em nossa base de dados',
          icon: 'success',
        })
        this.router.navigateByUrl('/profile')
      });
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.scss']
})
export class CadastroProdutoComponent implements OnInit {
  cadastroForm = new FormGroup({
    nomeProduto: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    descricao: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10)
    ]),
    marca: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    valor: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0.01)
    ]),
  });

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {}

  onSubmit() {
    if (this.cadastroForm.valid) {
      this.firebaseService.createProduto(this.cadastroForm.value)
        .then(() => {
          console.log('Produto criado com sucesso');
          this.cadastroForm.reset();  // Redefine o formulário após o envio bem-sucedido
          // Redirecionar ou mostrar mensagem de sucesso
        })
        .catch((error) => {
          console.error('Erro ao criar produto:', error);
          // Mostrar mensagem de erro
        });
    }
  }
}

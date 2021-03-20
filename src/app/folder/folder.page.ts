import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

  }
  display = 0;
  memory = 0;
  state = 'number';
  operador = '+';
  decimal = false;
  decimals = 0;

  clickNumero(numero: number) {
    switch (this.state) {
      case 'numero':
        if (this.decimal) {
          this.decimals++;
          this.display = this.display + numero * Math.pow(10, -this.decimals);
        } else {
          this.display = this.display * 10 + numero;
        }
        break;
      case 'operator':
        this.display = numero;
        this.state = 'numero';
        break;
      case 'result':
        this.memory = 0;
        this.display = numero;
        this.state = 'numero';
    }
  }

  clickOperador(operando: string) {
    // console.log('clickOperator inicio');
    this.calcular();
    this.operador = operando;
    this.memory = this.display;
    this.state = 'operator';
    // console.log('clickOperator fin');
  }

  calcular() {
    this.display = eval('' + this.memory + this.operador + '(' + this.display + ')');
    this.memory = 0;
    this.state = 'result';
    this.operador = '+';
    this.decimal = false;
    this.decimals = 0;
  }

  resetLastNumber() {
    this.display = 0;
    this.state = 'numero';
    this.decimal = false;
    this.decimals = 0;
  }

  limpiar() {
    this.display = 0;
    this.memory = 0;
    this.state = 'numero';
    this.operador = '+';
    this.decimal = false;
    this.decimals = 0;
  }

  /* changeSign() {
    this.display = this.display * -1;
  } */

  setDecimal() {
    this.decimal = true;
  }

}

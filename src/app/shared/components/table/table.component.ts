import { Component, OnInit, TemplateRef, ContentChild, Input, ViewChild, ChangeDetectorRef, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'ew-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() title = '';
  @Input() loading = true;
  @Input() columns!: string[];
  @Input() columnsHeader: string[]=[];
  @Input() list!: any[];
  @Input() pageSizeOptions!: number[];
  dataSource!: MatTableDataSource<any>;
  @Input() optional = '';
  @ContentChild('card', { static: false }) cardTemplateRef!: TemplateRef<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Output() retirar: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setDataSource();
  }

  sortData(sort: Sort) {
    this.setDataSource();
  }

  private setDataSource(): void {
    this.dataSource = new MatTableDataSource(this.list);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  emitterRetirar(item: any): void {
    this.retirar.emit(item);    
  }

}

/* 
Documentación:
---------------------------------------------------------------------------------------

--> El componente se intancia asi dentro del html del componente que los utilice:

<div class="container">
  <ew-table 
  [list]="displayedItems" 
  [columns]="displayedColumns" 
  title="Lista de prueba" 
  optional="'Lista vacia" 
  [loading]="loading">
  </ew-table>
</div>

---------------------------------------------------------------------------------------

--> El "list" es el array de objetos a ser mostrado en la tabla. Los objetos pueden tener items de 
    más, porque solo se va a mostrar los que tengan una columna que les corresponda. Type: <any>[]
    !Debe tener id! (no importa mayusculas o minusculas)

---------------------------------------------------------------------------------------

--> El "column" va a definir las columnas de la tabla. Type: string[]. 
    Por ej: const displayedColumns = ["ID", "Name", "Value"];
    (no importa mayusculas o minusculas)

---------------------------------------------------------------------------------------

--> El "loading" determina si se muestra es spinner o no segun true o false. Type: boolean;

-------------------------------------------------------------------------------------- 

--> El "opcional" es el texto que se va a mostrar en caso de que la lista de items este vacia. Type: string;

-------------------------------------------------------------------------------------- 

--> El "title" es el que se va a mostrar por encima de la tabla. Type: string;

-------------------------------------------------------------------------------------- 

--> El "columnsHeader"[Opcional] es el array de Headers de cada columna de la tabla, cada header tiene que 
    tener el mismo orden que su columna asociada, de ser null toma por default "column" como header
    
---------------------------------------------------------------------------------------

--> El "pageSizeOptions"[Opcional] es un array de numeros que inidica al paginador las filas que puede mostrar.
    Default:[5, 10, 25, 100]

---------------------------------------------------------------------------------------
*/

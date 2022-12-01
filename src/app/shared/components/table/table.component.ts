import { Component, OnInit, TemplateRef, ContentChild, Input, ViewChild, ChangeDetectorRef, SimpleChanges } from '@angular/core';
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
  @Input() list!: any[];
  dataSource!: MatTableDataSource<any>;
  @Input() optional = '';
  @ContentChild('card', { static: false }) cardTemplateRef!: TemplateRef<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
*/

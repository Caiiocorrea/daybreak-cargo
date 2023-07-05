import { Component } from '@angular/core';

@Component({
	selector: 'app-infinite-scroll',
	template: `
    <div class="scroll-container" (scroll)="onScroll()">
      <div *ngFor="let item of items">
        {{ item }}
      </div>
      <div class="isLoading" *ngIf="isLoading">Carregando...</div>
    </div>
  `,
	styleUrls: ['./infinite-scroll.component.css'],
})
export class InfiniteScrollComponent {
	items: any[] = []; // Array para armazenar os itens carregados
	isLoading = false; // Indicador de carregamento

	onScroll() {
		console.log('onScroll');
		// Verificar se já está carregando ou não há mais itens para carregar
		if (this.isLoading || this.noMoreItems()) {
			return;
		}

		const container = document.querySelector('.scroll-container') as HTMLElement;
		const scrollHeight = container.scrollHeight;
		const scrollTop = container.scrollTop;
		const clientHeight = container.clientHeight;

		// Verificar se o usuário chegou ao final da rolagem
		if (scrollHeight - scrollTop === clientHeight) {
			this.isLoading = true;

			// Simular uma requisição assíncrona para obter mais itens
			this.loadMoreItems().then((newItems) => {
				this.items = [...this.items, ...newItems];
				this.isLoading = false;
			});
		}
	}

	loadMoreItems(): Promise<any[]> {
		// Aqui você pode fazer uma chamada HTTP ou qualquer outra lógica para obter mais itens
		// Retorne uma Promise com os novos itens carregados
		return new Promise<any[]>((resolve) => {
			setTimeout(() => {
				const newItems = ['Item 1', 'Item 2', 'Item 3']; // Exemplo de novos itens
				resolve(newItems);
			}, 2000);
		});
	}

	noMoreItems(): boolean {
		// Verifique se não há mais itens para carregar
		// Retorne true se não houver mais itens, caso contrário, false
		// Você pode usar essa função para decidir quando parar de fazer novas solicitações
		return false; // Exemplo: sempre há mais itens para carregar
	}
}

export type Order = {
	[key: string]: string[];
};

export type Carroceira = Order;

export const orders: Order = {
	leves: ['Toco', 'Vlc', 'Fiorino', '3/4'],
	medio: ['Truck', 'Bittruck'],
	pesado: ['Rodotrem', 'Vanderléia', 'Bitrem', 'Carreta LS', 'Carreta']
};

export const orderBody: Order = {
	fechada: ['Baú', 'Baú frigorifico', 'Slider'],
	aberta: ['Caçamba', 'Grade baixa', 'Graneleiro'],
	especial: [
		'Bug porta container',
		'Munk',
		'Silo',
		'Tanque',
		'Gaiola',
		'Cegonha',
		'Apenas cavalo'
	]
};


export const ordersStatus: Order = {
	status: [
		"Pendente",
		"Preparando",
		"Despachado",
		"Cancelado",
		"Concluído"
	],
	
};
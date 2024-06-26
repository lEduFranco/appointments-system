declare namespace Express {
  export interface Request {
    user: {
      id: string;
      role: 'admin' | 'rh' | 'secretary' | 'provider' | 'client';
    };
  }
}

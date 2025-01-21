import { Observable } from 'rxjs';
import { AuthService } from '../../business/services/auth/auth.service';

export function appInitializer(
  authService: AuthService
): () => Observable<any> {
  return () => authService.refreshToken();
}
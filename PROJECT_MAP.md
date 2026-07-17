# Project Map

> Fonte de verdade sobre onde as coisas estão nesta aplicação.
> Consulte antes de criar; atualize depois de qualquer mudança estrutural.

## Páginas & Rotas

| Página | Rota | Caminho do ficheiro | Descrição |
|--------|------|----------------------|-----------|
| Landing | `/` | `src/app/page.tsx` | Landing page pública com hero, pesquisa, imóveis em destaque e como funciona |
| **Autenticação** |
| Entrar | `/entrar` | `src/app/(auth)/entrar/page.tsx` | Formulário de login |
| Registar | `/registar` | `src/app/(auth)/registar/page.tsx` | Formulário de registo |
| Método de pagamento | `/registar/metodo-pagamento` | `src/app/(auth)/registar/metodo-pagamento/page.tsx` | Adicionar cartão no fluxo de registo |
| Verificar código | `/verificar` | `src/app/(auth)/verificar/page.tsx` | Verificação de código de email |
| Recuperar senha | `/recuperar-senha` | `src/app/(auth)/recuperar-senha/page.tsx` | Recuperação de password |
| Nova senha | `/nova-senha` | `src/app/(auth)/nova-senha/page.tsx` | Definir nova password |
| **Área de utilizador (com Header + Footer)** |
| Pesquisa | `/pesquisa` | `src/app/(app)/pesquisa/page.tsx` | Resultados de pesquisa com filtros (tipo, quartos, preço) |
| Detalhe do imóvel | `/imovel/[id]` | `src/app/(app)/imovel/[id]/page.tsx` | Fotos, specs, descrição, comodidades e contacto bloqueado |
| Desbloquear contacto | `/imovel/[id]/desbloquear` | `src/app/(app)/imovel/[id]/desbloquear/page.tsx` | Pagamento (M-Pesa / cartão) para revelar contacto — 150 MZN |
| Publicar imóvel | `/publicar` | `src/app/(app)/publicar/page.tsx` | Formulário multi-step de 4 passos para publicar anúncio |
| Os meus imóveis | `/meus-imoveis` | `src/app/(app)/meus-imoveis/page.tsx` | Dashboard do senhorio com estatísticas e gestão de anúncios |
| Favoritos | `/favoritos` | `src/app/(app)/favoritos/page.tsx` | Imóveis guardados como favoritos |
| Conta | `/conta` | `src/app/(app)/conta/page.tsx` | Perfil do utilizador |

## Layouts

| Layout | Caminho | Aplica-se a |
|--------|---------|-------------|
| Root | `src/app/layout.tsx` | Tudo (font, metadata global) |
| Auth | `src/app/(auth)/layout.tsx` | Páginas de autenticação — slideshow lateral |
| App | `src/app/(app)/layout.tsx` | Área autenticada — Header + Footer |

## Componentes principais

| Componente | Caminho | Descrição |
|------------|---------|-----------|
| ImovelCard | `src/components/ImovelCard.tsx` | Card de imóvel para listagens |
| Header | `src/components/Header.tsx` | Barra de navegação principal |
| Footer | `src/components/Footer.tsx` | Rodapé com newsletter |

## Data

| Ficheiro | Descrição |
|----------|-----------|
| `src/data/imoveis.tsx` | Lista de imóveis com todos os campos (tipo, preço, specs, proprietário mascarado) |
| `src/data/places.tsx` | Dados legados do projecto anterior — manter por agora |

## Tabelas (Prisma)

> Ainda não há schema Prisma — apenas frontend por agora.

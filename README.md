# ddc-gemojione

gemojione source for ddc.vim

## Required

### denops.vim

https://github.com/vim-denops/denops.vim

### ddc.vim

https://github.com/Shougo/ddc.vim

## Configuration

```vim
" Use gitmoji source
call ddc#custom#patch_global('sources', ['gemojione'])
" Add matching pattern
call ddc#custom#patch_global('keywordPattern', '[a-zA-Z_:]\w*')
" Change source options
call ddc#custom#patch_global('sourceOptions', {
  \ 'gemojione': {
  \	'mark': 'gemojione',
  \	'matchers': ['gemojione'],
  \	'sorters': [],
  \	},
  \  })
" Change source params
call ddc#custom#patch_global('sourceParams', {
  \ 'gemojione': {
  \	'altCodes': {
  \      ':bug:': ':fix:',
  \      ':fire:': ':remove:'
  \      },
  \    },
  \  })
```

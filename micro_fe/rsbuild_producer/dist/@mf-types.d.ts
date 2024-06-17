
    export type RemoteKeys = 'REMOTE_ALIAS_IDENTIFIER/button';
    type PackageType<T> = T extends 'REMOTE_ALIAS_IDENTIFIER/button' ? typeof import('REMOTE_ALIAS_IDENTIFIER/button') :any;
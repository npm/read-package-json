# Changelog

# [4.0.0](https://github.com/npm/read-package-json/compare/v3.0.1...v4.0.0) (2021-08-18)


### Bug Fixes

* **parseError:** use file not path attribute ([5002e00](https://github.com/npm/read-package-json/commit/5002e00))


### BREAKING CHANGES

* **parseError:** rename file attribute to path

In order to align with the way our other "fast" json parsers work the
err.file attribute needs to be renamed to err.path.

Also other errors i.e. ENOENT attach a path attribute.



<a name="3.0.1"></a>
## [5.0.2](https://github.com/npm/read-package-json/compare/v5.0.1...v5.0.2) (2022-08-23)


### Dependencies

* bump npm-normalize-package-bin from 1.0.1 to 2.0.0 ([#129](https://github.com/npm/read-package-json/issues/129)) ([6ce5501](https://github.com/npm/read-package-json/commit/6ce55010e88f83a4d59097e5583e4a8715260a63))

### [5.0.1](https://github.com/npm/read-package-json/compare/v5.0.0...v5.0.1) (2022-04-20)


### Dependencies

* bump glob from 7.2.0 to 8.0.1 ([#124](https://github.com/npm/read-package-json/issues/124)) ([ddd4a2a](https://github.com/npm/read-package-json/commit/ddd4a2aecb327c0884e7d6641f20255abcc464c6))

## [5.0.0](https://www.github.com/npm/read-package-json/compare/v4.1.2...v5.0.0) (2022-03-15)


### ⚠ BREAKING CHANGES

* This drops support for node10 and non-LTS versions of node12 and node14

### Bug Fixes

* always use / in package.json paths ([18cc3fa](https://www.github.com/npm/read-package-json/commit/18cc3faafae4aa39d5c5243feb5240a55da64965))
* move files to lib ([bd7fac4](https://www.github.com/npm/read-package-json/commit/bd7fac4862a6f230bc0e37b3483079cf9a49c275))


* @npmcli/template-oss@2.9.2 ([2122bc2](https://www.github.com/npm/read-package-json/commit/2122bc20231dfd0d6cee85e014e118f12192cdfc))


### Dependencies

* bump normalize-package-data from 3.0.3 to 4.0.0 ([#113](https://www.github.com/npm/read-package-json/issues/113)) ([b905443](https://www.github.com/npm/read-package-json/commit/b90544351fea84cf557572509129e84c06e8be45))
* update glob requirement from ^7.1.1 to ^7.2.0 ([#115](https://www.github.com/npm/read-package-json/issues/115)) ([35482c4](https://www.github.com/npm/read-package-json/commit/35482c48afde7d7d3fc647416acfb30a9c753b1d))
* update json-parse-even-better-errors requirement ([#116](https://www.github.com/npm/read-package-json/issues/116)) ([1b1b3f0](https://www.github.com/npm/read-package-json/commit/1b1b3f0a979d1f6cd4a46b86b21abe020d849052))
* update npm-normalize-package-bin requirement from ^1.0.0 to ^1.0.1 ([#114](https://www.github.com/npm/read-package-json/issues/114)) ([d1f64a5](https://www.github.com/npm/read-package-json/commit/d1f64a5d8250cc96df2f21200f92c5633418b33e))

## [3.0.1](https://github.com/npm/read-package-json/compare/v3.0.0...v3.0.1) (2021-02-22)


### Bug Fixes

* Strip underscore prefixed fields from file contents ([ac771d8](https://github.com/npm/read-package-json/commit/ac771d8))



<a name="3.0.0"></a>
# [3.0.0](https://github.com/npm/read-package-json/compare/v2.1.2...v3.0.0) (2020-10-13)


### Bug Fixes

* check-in updated lockfile ([19d9fbe](https://github.com/npm/read-package-json/commit/19d9fbe))



<a name="2.1.2"></a>
## [2.1.2](https://github.com/npm/read-package-json/compare/v2.1.1...v2.1.2) (2020-08-20)


### Bug Fixes

* even better json errors, remove graceful-fs ([fdbf082](https://github.com/npm/read-package-json/commit/fdbf082))



<a name="2.1.1"></a>
## [2.1.1](https://github.com/npm/read-package-json/compare/v2.1.0...v2.1.1) (2019-12-09)


### Bug Fixes

* normalize and sanitize pkg bin entries ([b8cb5fa](https://github.com/npm/read-package-json/commit/b8cb5fa))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/npm/read-package-json/compare/v2.0.13...v2.1.0) (2019-08-13)


### Features

* support bundleDependencies: true ([76f6f42](https://github.com/npm/read-package-json/commit/76f6f42))



<a name="2.0.13"></a>
## [2.0.13](https://github.com/npm/read-package-json/compare/v2.0.12...v2.0.13) (2018-03-08)


### Bug Fixes

* **git:** support git packed refs --all mode ([#77](https://github.com/npm/read-package-json/issues/77)) ([1869940](https://github.com/npm/read-package-json/commit/1869940))

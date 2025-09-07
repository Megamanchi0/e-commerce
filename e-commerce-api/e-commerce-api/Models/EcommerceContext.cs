using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace e_commerce_api.Models;

public partial class EcommerceContext : DbContext
{
    public EcommerceContext()
    {
    }

    public EcommerceContext(DbContextOptions<EcommerceContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Categorium> Categoria { get; set; }

    public virtual DbSet<DetalleOrdenProducto> DetalleOrdenProductos { get; set; }

    public virtual DbSet<Estado> Estados { get; set; }

    public virtual DbSet<Orden> Ordens { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<Rol> Rols { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Categorium>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Categori__3213E83F64336DE2");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<DetalleOrdenProducto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DetalleO__3213E83F7D447415");

            entity.ToTable("DetalleOrdenProducto");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Cantidad).HasColumnName("cantidad");
            entity.Property(e => e.IdOrden).HasColumnName("idOrden");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.ValorUnitario)
                .HasColumnType("money")
                .HasColumnName("valorUnitario");

            entity.HasOne(d => d.IdOrdenNavigation).WithMany(p => p.DetalleOrdenProductos)
                .HasForeignKey(d => d.IdOrden)
                .HasConstraintName("PORDENPRODUCTO_PEDIDO");

            entity.HasOne(d => d.IdProductoNavigation).WithMany(p => p.DetalleOrdenProductos)
                .HasForeignKey(d => d.IdProducto)
                .HasConstraintName("ORDENPRODUCTO_PRODUCTO");
        });

        modelBuilder.Entity<Estado>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Estado__3213E83F225848DE");

            entity.ToTable("Estado");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Orden>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Orden__3213E83FF3926B02");

            entity.ToTable("Orden");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DireccionEnvio)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("direccionEnvio");
            entity.Property(e => e.Fecha)
                .HasColumnType("datetime")
                .HasColumnName("fecha");
            entity.Property(e => e.IdEstado).HasColumnName("idEstado");
            entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");
            entity.Property(e => e.ValorTotal)
                .HasColumnType("money")
                .HasColumnName("valorTotal");

            entity.HasOne(d => d.IdEstadoNavigation).WithMany(p => p.Ordens)
                .HasForeignKey(d => d.IdEstado)
                .HasConstraintName("ORDEN_ESTADO");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Ordens)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("ORDEN_USUARIO");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Producto__3213E83F37B7743B");

            entity.ToTable("Producto");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Activo).HasColumnName("activo");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("descripcion");
            entity.Property(e => e.IdCategoria).HasColumnName("idCategoria");
            entity.Property(e => e.Nombre)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Precio)
                .HasColumnType("money")
                .HasColumnName("precio");
            entity.Property(e => e.Stock).HasColumnName("stock");
            entity.Property(e => e.UrlImagen)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("urlImagen");

            entity.HasOne(d => d.IdCategoriaNavigation).WithMany(p => p.Productos)
                .HasForeignKey(d => d.IdCategoria)
                .HasConstraintName("PRODUCTO_CATEGORIA");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Rol__3213E83F8457D93E");

            entity.ToTable("Rol");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Usuario__3213E83FFEE1EAD5");

            entity.ToTable("Usuario");

            entity.HasIndex(e => e.Documento, "UQ__Usuario__A25B3E610329164F").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Apellido)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("apellido");
            entity.Property(e => e.Contrasena)
                .HasMaxLength(64)
                .IsUnicode(false)
                .HasColumnName("contrasena");
            entity.Property(e => e.Correo)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("correo");
            entity.Property(e => e.Direccion)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("direccion");
            entity.Property(e => e.Documento)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("documento");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Telefono)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("telefono");

            entity.HasOne(d => d.IdRolNavigation).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.IdRol)
                .HasConstraintName("USUARIO_ROL");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

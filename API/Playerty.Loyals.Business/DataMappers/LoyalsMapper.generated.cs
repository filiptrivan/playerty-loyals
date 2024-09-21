using Riok.Mapperly.Abstractions;
using Playerty.Loyals.Business.DTO;
using Playerty.Loyals.Business.Entities;

namespace Playerty.Loyals.Business.DataMappers
{
    [Mapper]
    public static partial class Mapper
    {

        #region TransactionProduct

        public static partial TransactionProduct Map(TransactionProductDTO dto);

                [MapProperty("Transaction.Id", "TransactionId")]
[MapProperty("Transaction.Id", "TransactionDisplayName")]
        public static partial TransactionProductDTO Map(TransactionProduct poco);

                [MapProperty("Transaction.Id", "TransactionId")]
[MapProperty("Transaction.Id", "TransactionDisplayName")]
        public static partial TransactionProductDTO ExcelMap(TransactionProduct poco);

                [MapProperty("Transaction.Id", "TransactionId")]
[MapProperty("Transaction.Id", "TransactionDisplayName")]
        public static partial IQueryable<TransactionProductDTO> ProjectTo(this IQueryable<TransactionProduct> poco);

                [MapProperty("Transaction.Id", "TransactionId")]
[MapProperty("Transaction.Id", "TransactionDisplayName")]
        public static partial IQueryable<TransactionProductDTO> ExcelProjectTo(this IQueryable<TransactionProduct> poco);

        public static partial void MergeMap(TransactionProductDTO dto, TransactionProduct poco);

        #endregion


        #region TransactionStatus

        public static partial TransactionStatus Map(TransactionStatusDTO dto);

                
        public static partial TransactionStatusDTO Map(TransactionStatus poco);

                
        public static partial TransactionStatusDTO ExcelMap(TransactionStatus poco);

                
        public static partial IQueryable<TransactionStatusDTO> ProjectTo(this IQueryable<TransactionStatus> poco);

                
        public static partial IQueryable<TransactionStatusDTO> ExcelProjectTo(this IQueryable<TransactionStatus> poco);

        public static partial void MergeMap(TransactionStatusDTO dto, TransactionStatus poco);

        #endregion


        #region UserExtended

        public static partial UserExtended Map(UserExtendedDTO dto);

        

        

                [MapProperty("Tier.Id", "TierId")]
[MapProperty("Tier.Id", "TierDisplayName")]
        public static partial IQueryable<UserExtendedDTO> ProjectTo(this IQueryable<UserExtended> poco);

                [MapProperty("Tier.Id", "TierId")]
[MapProperty("Tier.Id", "TierDisplayName")]
        public static partial IQueryable<UserExtendedDTO> ExcelProjectTo(this IQueryable<UserExtended> poco);

        public static partial void MergeMap(UserExtendedDTO dto, UserExtended poco);

        #endregion


        #region Transaction

        public static partial Transaction Map(TransactionDTO dto);

                [MapProperty("User.Id", "UserId")]
[MapProperty("User.Id", "UserDisplayName")]
        public static partial TransactionDTO Map(Transaction poco);

                [MapProperty("User.Id", "UserId")]
[MapProperty("User.Id", "UserDisplayName")]
        public static partial TransactionDTO ExcelMap(Transaction poco);

                [MapProperty("User.Id", "UserId")]
[MapProperty("User.Id", "UserDisplayName")]
        public static partial IQueryable<TransactionDTO> ProjectTo(this IQueryable<Transaction> poco);

                [MapProperty("User.Id", "UserId")]
[MapProperty("User.Id", "UserDisplayName")]
        public static partial IQueryable<TransactionDTO> ExcelProjectTo(this IQueryable<Transaction> poco);

        public static partial void MergeMap(TransactionDTO dto, Transaction poco);

        #endregion


        #region Tier

        public static partial Tier Map(TierDTO dto);

                
        public static partial TierDTO Map(Tier poco);

                
        public static partial TierDTO ExcelMap(Tier poco);

                
        public static partial IQueryable<TierDTO> ProjectTo(this IQueryable<Tier> poco);

                
        public static partial IQueryable<TierDTO> ExcelProjectTo(this IQueryable<Tier> poco);

        public static partial void MergeMap(TierDTO dto, Tier poco);

        #endregion

    }
}

